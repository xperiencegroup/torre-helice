import { useAppStore } from '../../../store/useAppStore'
import './ChatButton.css'
import { TRACK, track } from '../../../config/trackIds'

export const ChatButton: React.FC = () => {
  const toggleChat = useAppStore((s) => s.toggleChat)

  const chatOpen = useAppStore((s) => s.chatOpen)


  return (
    <button type="button" className="chat-button" title="Chat XP"   onClick={() => { track(TRACK.chat.toggle, { open: !chatOpen }); toggleChat() }}>
      XP
    </button>
  )
}