import ContactSection from "./component/ContactSection/ContactSection"
import Footer from "./component/Footer/Footer"
import HeroSection from "./component/HeroSection/HeroSection"
import ServiceSection from "./component/ServiceSection/ServiceSection"

 function App(){
    return(
        <div>
            <HeroSection/>
            <ServiceSection/>
            <ContactSection/>
            <Footer/>
        </div>
    )
}

export default App