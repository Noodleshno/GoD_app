import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ArrowLeft, Plus, Search, User } from "lucide-react";

export function Friends() {
  const navigate = useNavigate();

  const [friends, setFriends] = useState([
    { id: "1", name: "NeonPilot" },
    { id: "2", name: "SkyRider" },
    { id: "3", name: "TurboFlux" },
    { id: "4", name: "Velox" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddSearch, setShowAddSearch] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");

  const filteredFriends = useMemo(
    () =>
      friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      ),
    [friends, searchTerm]
  );

  const handleAddFriend = () => {
    const trimmedName = newFriendName.trim();
    if (!trimmedName) return;

    if (friends.some((friend) => friend.name.toLowerCase() === trimmedName.toLowerCase())) {
      setNewFriendName("");
      return;
    }

    setFriends((prev) => [
      ...prev,
      { id: String(Date.now()), name: trimmedName },
    ]);
    setNewFriendName("");
    setShowAddSearch(false);
  };

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
          <h1 className="text-2xl font-display font-bold text-white">Friends</h1>
        </div>

        <CyberButton
          variant="secondary"
          onClick={() => setShowAddSearch(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Friend
        </CyberButton>
      </div>

      {showAddSearch && (
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/50 p-4">
            <div className="flex items-center">
                <div className="flex-1" />
                <button
                    onClick={() => {
                        setShowAddSearch(false);
                        setNewFriendName("");
                    }}
                    className="text-xs text-muted-foreground hover:text-white ml-auto"
                    >
                        Cancel
                    </button> 
                </div>
          <div className="flex gap-2">
            <input
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              placeholder="Enter username"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <CyberButton
              onClick={handleAddFriend}
              className="px-4 py-3"
            >
              Add
            </CyberButton>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-black/50 p-4">
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-white/70" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search friends"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-black/50 p-4 scrollbar-hide">
        {filteredFriends.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No friends found.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-display text-white">{friend.name}</div>
                    <div className="text-xs text-muted-foreground">Online</div>
                  </div>
                </div>
                <CyberButton variant="ghost" className="text-xs px-3 py-2">
                  Profile
                </CyberButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}