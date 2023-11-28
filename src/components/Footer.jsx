import GithubSvg from "../assets/github-mark.svg"
import "../styles/Footer.css";

export function Footer() {
    return (<div className="footer no-print">
        <a href="https://github.com/niallantony" ><img src={GithubSvg} alt="Link to Github" />Niall Antony 2023</a>
    </div>)
}
