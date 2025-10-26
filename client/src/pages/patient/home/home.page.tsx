import MainSection from "../../../components/sections/main.section";
import TeamSection from "../../../components/sections/team.section";
import ServicePackSection from "../../../components/sections/service-pack.section";
import ContactSection from "../../../components/sections/contact.section";

const HomePage = () => {
    return (
        <main className="home-page">
            <MainSection />
            <TeamSection />
            <ServicePackSection />
            <ContactSection />
        </main>
    )
}

export default HomePage;