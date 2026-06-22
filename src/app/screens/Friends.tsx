import { useMemo, useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ArrowLeft, Check, RefreshCw, Search, Send, User, X } from "lucide-react";

export function Friends() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "add">(
    "friends"
  );

  const [friends, setFriends] = useState([
    { playFabId: "1", name: "NeonPilot", status: "online" },
    { playFabId: "2", name: "SkyRider", status: "idle" },
    { playFabId: "3", name: "TurboFlux", status: "online" },
    { playFabId: "4", name: "Velox", status: "offline" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDisplayName, setSearchDisplayName] = useState("");
  const [searchPlayFabId, setSearchPlayFabId] = useState("");
  const [foundPlayer, setFoundPlayer] = useState<{
    playFabId: string;
    displayName: string;
  } | null>(null);

  const [lookupLoading, setLookupLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [incomingRequests, setIncomingRequests] = useState<
    Array<{ requestId: string; fromDisplayName: string; createdAt: string }>
  >([
    {
      requestId: "req-01",
      fromDisplayName: "NightFury",
      createdAt: new Date().toISOString(),
    },
    {
      requestId: "req-02",
      fromDisplayName: "PulseRacer",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [sentRequests, setSentRequests] = useState<
    Array<{ requestId: string; toDisplayName: string; createdAt: string }>
  >([
    {
      requestId: "req-11",
      toDisplayName: "GhostDrift",
      createdAt: new Date().toISOString(),
    },
  ]);

  const user = {
    playFabId: "user-0",
    displayName: "PlayerOne",
    sessionTicket: "demo-ticket",
  };

  const onlineCount = useMemo(
    () => friends.filter((friend) => friend.status !== "offline").length,
    [friends]
  );

  const filteredFriends = useMemo(
    () =>
      friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ),
    [friends, searchTerm]
  );

  function handleLookup(e: FormEvent) {
    e.preventDefault();
    if (!searchDisplayName.trim()) return;

    setLookupLoading(true);
    setFoundPlayer(null);

    setTimeout(() => {
      setLookupLoading(false);
      setFoundPlayer({
        playFabId: "demo-" + searchDisplayName.trim().toLowerCase(),
        displayName: searchDisplayName.trim(),
      });
    }, 400);
  }

  function handleLookupById(e: FormEvent) {
    e.preventDefault();
    if (!searchPlayFabId.trim()) return;

    setLookupLoading(true);
    setFoundPlayer(null);

    setTimeout(() => {
      setLookupLoading(false);
      setFoundPlayer({
        playFabId: searchPlayFabId.trim(),
        displayName: `Player ${searchPlayFabId.trim().slice(-4)}`,
      });
    }, 400);
  }

  function handleSendRequest() {
    if (!foundPlayer) return;
    setAddLoading(true);

    setTimeout(() => {
      setAddLoading(false);
      setSentRequests((prev) => [
        ...prev,
        {
          requestId: "sent-" + Date.now(),
          toDisplayName: foundPlayer.displayName,
          createdAt: new Date().toISOString(),
        },
      ]);
      setFoundPlayer(null);
      setSearchDisplayName("");
      setSearchPlayFabId("");
      alert(`Request sent to ${foundPlayer.displayName}`);
    }, 400);
  }

  function handleRemove(friend: { playFabId: string; name: string }) {
    setFriends((prev) => prev.filter((item) => item.playFabId !== friend.playFabId));
    alert(`${friend.name} removed from friends`);
  }

  function handleInvite(friend: { playFabId: string; name: string }) {
    alert(`Invite sent to ${friend.name}`);
  }

  function handleAccept(request: { requestId: string; fromDisplayName: string }) {
    setIncomingRequests((prev) =>
      prev.filter((item) => item.requestId !== request.requestId)
    );
    setFriends((prev) => [
      ...prev,
      {
        playFabId: `friend-${Date.now()}`,
        name: request.fromDisplayName,
        status: "online",
      },
    ]);
    alert(`You are now friends with ${request.fromDisplayName}`);
  }

  function handleDecline(request: { requestId: string }) {
    setIncomingRequests((prev) =>
      prev.filter((item) => item.requestId !== request.requestId)
    );
    alert("Request declined");
  }

  function handleCancel(request: { requestId: string }) {
    setSentRequests((prev) =>
      prev.filter((item) => item.requestId !== request.requestId)
    );
    alert("Sent request cancelled");
  }

  function handleRefresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }
  
  return (
    <div className="flex flex-col h-full p-6 gap-6">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded border border-white/20 bg-black/50 text-white backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-white">
            Friends
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="w-10 h-10 flex items-center justify-center text-primary hover:text-white transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/50 p-3">
        <div className="flex flex-wrap gap-2">
          {(["friends", "requests", "add"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-white text-black shadow-sm"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {tab === "friends"
                ? "Friends"
                : tab === "requests"
                ? "Requests"
                : "Add Friend"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "friends" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {onlineCount} online · {friends.length} total
                </p>
                <h2 className="text-lg font-semibold text-white">My friends</h2>
              </div>
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-white/70" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search friends..."
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredFriends.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-muted-foreground">
                No friends found.
              </div>
            ) : (
              filteredFriends.map((friend) => (
                <div
                  key={friend.playFabId}
                  className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {friend.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {friend.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <CyberButton
                      variant="ghost"
                      className="text-xs px-3 py-2"
                      onClick={() => handleInvite(friend)}
                    >
                      Invite
                    </CyberButton>
                    <CyberButton
                      variant="ghost"
                      className="text-xs px-3 py-2"
                      onClick={() => handleRemove(friend)}
                    >
                      Remove
                    </CyberButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "requests" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Incoming Requests</h2>
                <p className="text-xs text-muted-foreground">
                  {incomingRequests.length} pending
                </p>
              </div>
            </div>

            {incomingRequests.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-muted-foreground">
                No incoming requests.
              </div>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map((request) => (
                  <div
                    key={request.requestId}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {request.fromDisplayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <CyberButton
                          onClick={() => handleAccept(request)}
                          className="px-3 py-2 text-xs"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </CyberButton>
                        <CyberButton
                          variant="secondary"
                          onClick={() => handleDecline(request)}
                          className="px-3 py-2 text-xs"
                        >
                          <X className="w-4 h-4" />
                          Decline
                        </CyberButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Sent Requests</h2>
                <p className="text-xs text-muted-foreground">
                  {sentRequests.length} pending
                </p>
              </div>
            </div>

            {sentRequests.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-muted-foreground">
                No sent requests.
              </div>
            ) : (
              <div className="space-y-3">
                {sentRequests.map((request) => (
                  <div
                    key={request.requestId}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {request.toDisplayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <CyberButton
                        variant="secondary"
                        onClick={() => handleCancel(request)}
                        className="px-3 py-2 text-xs"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </CyberButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "add" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <form
            onSubmit={handleLookup}
            className="rounded-3xl border border-white/10 bg-black/50 p-4"
          >
            <div className="mb-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-white/70" />
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Search by name
                </h2>
                <p className="text-xs text-muted-foreground">
                  Find a player by their display name.
                </p>
              </div>
            </div>
            <input
              value={searchDisplayName}
              onChange={(e) => {
                setSearchDisplayName(e.target.value);
                setFoundPlayer(null);
              }}
              placeholder="Enter name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <CyberButton
              type="submit"
              className="mt-4 w-full px-4 py-3"
              disabled={lookupLoading || !searchDisplayName.trim()}
            >
              {lookupLoading ? "Searching..." : "Search"}
            </CyberButton>
          </form>

          <form
            onSubmit={handleLookupById}
            className="rounded-3xl border border-white/10 bg-black/50 p-4"
          >
            <div className="mb-4 flex items-center gap-3">
              <Send className="w-5 h-5 text-white/70" />
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Search by PlayFab ID
                </h2>
                <p className="text-xs text-muted-foreground">
                  Enter the exact player ID.
                </p>
              </div>
            </div>
            <input
              value={searchPlayFabId}
              onChange={(e) => {
                setSearchPlayFabId(e.target.value);
                setFoundPlayer(null);
              }}
              placeholder="Enter PlayFab ID"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <CyberButton
              type="submit"
              className="mt-4 w-full px-4 py-3"
              disabled={lookupLoading || !searchPlayFabId.trim()}
            >
              {lookupLoading ? "Searching..." : "Search"}
            </CyberButton>
          </form>

          {foundPlayer && (
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {foundPlayer.displayName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {foundPlayer.playFabId}
                  </div>
                </div>
                <CyberButton
                  onClick={handleSendRequest}
                  className="px-4 py-3"
                  disabled={addLoading}
                >
                  {addLoading ? "Sending..." : "Send Request"}
                </CyberButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}