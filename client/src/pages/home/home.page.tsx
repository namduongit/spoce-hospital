import MainSection from "../../components/sections/main.section";
import NurseTeamSection from "../../components/sections/nurseTeam.section";

const HomePage = () => {
    console.log(import.meta.env.VITE_SERVER_URL);

    return (
        <main className="home-page">
            <MainSection />
            <NurseTeamSection />
        </main>
    )
}

export default HomePage;