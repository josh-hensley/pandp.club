import discordLogo from '../assets/discord-brands-solid-full.svg'

const Footer = () => {
    return (
        <footer>
            <p>&copy; <a href="https://www.joshhensley.com">Josh Hensley 2026</a></p>
            <a href="https://discord.com/channels/398603425706672146/1473899104630214778"><img src={discordLogo} className="fa-discord" /></a>
        </footer>
    )
}

export default Footer