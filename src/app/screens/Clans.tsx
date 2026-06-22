import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ArrowLeft, Plus, Users, UserPlus, Shield } from "lucide-react";

const CLAN_STORAGE_KEY = "god_clan_data";
const REQUESTED_CLANS_KEY = "god_requested_clans";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function Clans() {
  const navigate = useNavigate();

  const [clan, setClan] = useState<{
    name: string;
    leader: string;
    members: string[];
  } | null>(() => readStorage(CLAN_STORAGE_KEY, null));

  const [activeTab, setActiveTab] = useState<
    "browse" | "overview" | "members" | "create"
  >(() => (readStorage(CLAN_STORAGE_KEY, null) ? "overview" : "browse"));

  const [newClanName, setNewClanName] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [showInviteField, setShowInviteField] = useState(false);
  const [requestedClanIds, setRequestedClanIds] = useState<string[]>(
    () => readStorage(REQUESTED_CLANS_KEY, [])
  );

  const availableClans = [
    {
      id: "clan-01",
      name: "Neon Syndicate",
      tag: "NEON",
      leader: "Razor",
      members: 12,
      points: 8420,
    },
    {
      id: "clan-02",
      name: "Pulse Riders",
      tag: "PULSE",
      leader: "Vega",
      members: 9,
      points: 7310,
    },
    {
      id: "clan-03",
      name: "Cyber Drift",
      tag: "CYBR",
      leader: "Nova",
      members: 15,
      points: 9840,
    },
  ];

  const hasClan = Boolean(clan);

  useEffect(() => {
    if (clan) {
      window.localStorage.setItem(CLAN_STORAGE_KEY, JSON.stringify(clan));
    } else {
      window.localStorage.removeItem(CLAN_STORAGE_KEY);
    }
  }, [clan]);

  useEffect(() => {
    window.localStorage.setItem(
      REQUESTED_CLANS_KEY,
      JSON.stringify(requestedClanIds)
    );
  }, [requestedClanIds]);

  useEffect(() => {
    if (clan && activeTab === "browse") {
      setActiveTab("overview");
    }
    if (!clan && activeTab === "overview") {
      setActiveTab("browse");
    }
  }, [clan, activeTab]);

  const handleCreateClan = () => {
    const trimmed = newClanName.trim();
    if (!trimmed) return;

    setClan({
      name: trimmed,
      leader: "You",
      members: ["You"],
    });
    setNewClanName("");
    setShowInviteField(false);
    setActiveTab("overview");
  };

  const handleInviteMember = () => {
    const trimmed = inviteName.trim();
    if (!trimmed || !clan) return;
    if (
      clan.members.some(
        (member) => member.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setInviteName("");
      return;
    }

    setClan({
      ...clan,
      members: [...clan.members, trimmed],
    });
    setInviteName("");
  };

  const handleDeleteClan = () => {
    setClan(null);
    setInviteName("");
    setShowInviteField(false);
    setNewClanName("");
    setActiveTab("browse");
  };

  const handleRequestJoin = (clanId: string, clanName: string) => {
    if (requestedClanIds.includes(clanId)) return;
    setRequestedClanIds((prev) => [...prev, clanId]);
    alert(`Request to join "${clanName}" sent`);
  };

  return (
    <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded border border-white/20 bg-black/50 text-white backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold text-white">Clans</h1>
        </div>

        {!hasClan && (
          <CyberButton
            variant="secondary"
            onClick={() => setActiveTab("create")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create
          </CyberButton>
        )}
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/50 p-3">
        <div className="flex flex-wrap gap-2">
          {!hasClan && (
            <button
              onClick={() => setActiveTab("browse")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "browse"
                  ? "bg-white text-black shadow-sm"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Browse
            </button>
          )}

          {hasClan && (
            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "overview"
                  ? "bg-white text-black shadow-sm"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Overview
            </button>
          )}

          {hasClan && (
            <button
              onClick={() => setActiveTab("members")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "members"
                  ? "bg-white text-black shadow-sm"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Members
            </button>
          )}

          <button
            onClick={() => setActiveTab("create")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "create"
                ? "bg-white text-black shadow-sm"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {hasClan ? "Delete" : "Create"}
          </button>
        </div>
      </div>

      {activeTab === "browse" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Available clans</h2>
                <p className="text-sm text-muted-foreground">
                  Choose a clan and send a join request.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                {availableClans.length} clans
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {availableClans.map((clanItem) => (
              <div
                key={clanItem.id}
                className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{clanItem.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {clanItem.tag} · Leader: {clanItem.leader}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{clanItem.members} members</span>
                    <span>{clanItem.points} points</span>
                  </div>
                </div>
                <CyberButton
                  variant={requestedClanIds.includes(clanItem.id) ? "secondary" : "ghost"}
                  className="px-4 py-3 text-xs"
                  onClick={() => handleRequestJoin(clanItem.id, clanItem.name)}
                  disabled={requestedClanIds.includes(clanItem.id)}
                >
                  {requestedClanIds.includes(clanItem.id) ? "Requested" : "Request join"}
                </CyberButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
            {clan ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-xs text-primary uppercase tracking-widest">
                      Your clan
                    </span>
                    <h2 className="mt-2 text-3xl font-display font-bold text-white">
                      {clan.name}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                    Active
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">
                      Leader
                    </div>
                    <div className="mt-3 text-lg font-semibold text-white">
                      {clan.leader}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">
                      Members
                    </div>
                    <div className="mt-3 text-lg font-semibold text-white">
                      {clan.members.length}
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-display text-white">
                        Clan Members
                      </span>
                    </div>
                    <CyberButton
                      variant="ghost"
                      onClick={() => setActiveTab("members")}
                      className="text-xs px-3 py-2"
                    >
                      Open members
                    </CyberButton>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {clan.members.map((member) => (
                      <div
                        key={member}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm text-white">{member}</div>
                          <div className="text-xs text-muted-foreground">
                            {member === clan.leader ? "Leader" : "Member"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground">
                You don't have a clan yet. Go to the "Browse" tab to select an
                available clan, or create your own on the "Create" tab.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Members</h2>
                <p className="text-sm text-muted-foreground">
                  List of clan members and invitations.
                </p>
              </div>
              {clan && (
                <CyberButton
                  variant="secondary"
                  onClick={() => setShowInviteField((value) => !value)}
                  className="flex items-center gap-2 text-xs px-3 py-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite
                </CyberButton>
              )}
            </div>

            {!clan ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-muted-foreground">
                First, create a clan on the "Create" tab.
              </div>
            ) : (
              <>
                {showInviteField && (
                  <div className="mt-4 flex flex-col gap-3 md:flex-row">
                    <input
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      placeholder="Invite member name"
                      className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                    <CyberButton
                      onClick={handleInviteMember}
                      className="px-4 py-3"
                    >
                      Send invite
                    </CyberButton>
                  </div>
                )}

                <div className="mt-4 grid gap-3">
                  {clan.members.map((member) => (
                    <div
                      key={member}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm text-white">{member}</div>
                        <div className="text-xs text-muted-foreground">
                          {member === clan.leader ? "Leader" : "Member"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "create" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
            {clan ? (
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                  <Shield className="mx-auto mb-4 w-12 h-12 text-primary/60" />
                  <div className="text-sm font-semibold text-white">
                    Clan already created
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You already have a clan «{clan.name}». You can delete it and
                    create a new one.
                  </p>
                </div>

                <CyberButton
                  onClick={handleDeleteClan}
                  className="w-full px-4 py-3"
                >
                  Delete clan
                </CyberButton>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Create a clan
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the name of the new clan.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={newClanName}
                    onChange={(e) => setNewClanName(e.target.value)}
                    placeholder="Clan name"
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                  <CyberButton
                    onClick={handleCreateClan}
                    className="px-4 py-3"
                  >
                    Create
                  </CyberButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}