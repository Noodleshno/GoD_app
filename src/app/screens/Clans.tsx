import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ArrowLeft, Plus, Users, UserPlus } from "lucide-react";

export function Clans() {
  const navigate = useNavigate();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClanName, setNewClanName] = useState("");
  const [clan, setClan] = useState<{
    name: string;
    leader: string;
    members: string[];
  } | null>(null);
  const [inviteName, setInviteName] = useState("");
  const [showInviteField, setShowInviteField] = useState(false);

  const handleCreateClan = () => {
    const trimmed = newClanName.trim();
    if (!trimmed) return;

    setClan({
      name: trimmed,
      leader: "You",
      members: ["You"],
    });
    setNewClanName("");
    setShowCreateForm(false);
  };

  const handleInviteMember = () => {
    const trimmed = inviteName.trim();
    if (!trimmed || !clan) return;
    if (clan.members.some((member) => member.toLowerCase() === trimmed.toLowerCase())) {
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
    setShowCreateForm(false);
    setShowInviteField(false);
    setNewClanName("");
    setInviteName("");
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
          <h1 className="text-xl font-display font-bold uppercase tracking-widest text-white">Clans</h1>
        </div>

        <CyberButton
          variant="secondary"
          onClick={() => {
             if (clan) {
               handleDeleteClan();
             } else {
               setShowCreateForm(true);
               setShowInviteField(false);
             }
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {clan ? "Delete clan" : "Create a clan"}
        </CyberButton>
      </div>

      {showCreateForm && !clan && (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-display text-white">Create a new clan</div>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewClanName("");
              }}
              className="text-xs text-muted-foreground hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <input
              value={newClanName}
              onChange={(e) => setNewClanName(e.target.value)}
              placeholder="Clan name"
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <CyberButton onClick={handleCreateClan} className="px-4 py-3">
              Confirm
            </CyberButton>
          </div>
        </div>
      )}

      {clan ? (
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs text-primary uppercase tracking-widest">Your clan</span>
              <h2 className="text-3xl font-display font-bold text-white">{clan.name}</h2>
            </div>
            <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-muted-foreground">
              Clan is active
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Leader</div>
              <div className="mt-3 text-lg font-semibold text-white">{clan.leader}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Members</div>
              <div className="mt-3 text-lg font-semibold text-white">{clan.members.length}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-display text-white">Clan Members</span>
              </div>
              <CyberButton
                variant="ghost"
                onClick={() => setShowInviteField((prev) => !prev)}
                className="text-xs px-3 py-2"
              >
                Invite Member
              </CyberButton>
            </div>

            {showInviteField && (
              <div className="mt-4 flex gap-3">
                <input
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Invitee's nickname"
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
                <CyberButton onClick={handleInviteMember} className="px-4 py-3">
                  Invite
                </CyberButton>
              </div>
            )}

            <div className="mt-5 grid gap-3">
              {clan.members.map((member) => (
                <div
                  key={member}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="text-sm text-muted-foreground">
            You don't have a clan yet. Click "Create a clan" to get started.
          </div>
        </div>
      )}
    </div>
  );
}