import React, { useEffect, Suspense } from "react";
import { useWindowScroll } from 'react-use';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import logoImg from "../../assets/lgo.png";
import Footer from "../../components/footer/Footer";
import { ShowOnLogOut, ShowOnLogin } from "../../components/protect/ConcealedLinks";
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Model from "../../components/threeModel/Model";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Parallax } from 'react-parallax';
import { useMediaQuery } from 'react-responsive'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3a4750',
    },
    secondary: {
      main: '#f1c40f',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif, -apple-system',
  },
});

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledNav = styled('nav')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background: rgba(${props => props.opacity});
  backdrop-filter: blur(${props => props.blur}px);
`;

const NavItem = styled(Button)`
  margin-left: -45px;
  margin-right: 65px;
  text-transform: none;
  font-size: 1.2rem;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Gotham';
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f1c40f;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    transform-origin: right;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Home = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [navOpacity, setNavOpacity] = React.useState(0);
  const [navBlur, setNavBlur] = React.useState(0);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  
  useEffect(() => {
    if (pageYOffset > 50) {
      setNavOpacity(0.9);
      setNavBlur(5);
    } else {
      setNavOpacity(1);
      setNavBlur(0);
    }
  }, [pageYOffset]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
    });
  }, []);

  if (isTabletOrMobile){
    return (
      <ThemeProvider theme={theme}>
        <Parallax
          blur={{ min: -15, max: 25 }}
          bgImageAlt="the cat"
          strength={200}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              maxWidth: '100%',
            }}
          >
            <StyledNav opacity={navOpacity} blur={navBlur}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  alt="ss"
                  src={logoImg}
                  style={{ width: "200px", height: "60px", marginLeft: "10px" }}
                />
              </Box>
              <Box>
                <ShowOnLogOut>
                  <NavItem
                    sx={{
                      fontFamily: 'SF Pro Display Medium',
                      marginTop: 0,
                      marginLeft: 5,
                    }}
                    component={StyledLink}
                    to="/register"
                  >
                    Register
                  </NavItem>
                </ShowOnLogOut>
                <ShowOnLogOut>
                  <NavItem
                    sx={{
                      fontFamily: 'SF Pro Display Medium',
                      marginTop: -2,
                      marginLeft: 5,
                    }}
                    component={StyledLink}
                    to="/login"
                  >
                    Login
                  </NavItem>
                </ShowOnLogOut>
                <ShowOnLogin>
                  <NavItem
                    sx={{
                      fontFamily: 'SF Pro Display Medium',
                      marginTop: -2,
                      marginLeft: 5,
                    }}
                    component={StyledLink}
                    to="/dash"
                  >
                    Dashboard
                  </NavItem>
                </ShowOnLogin>
              </Box>
            </StyledNav>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#202023',
                paddingTop: '60px',
                paddingLeft: '15px',
                paddingRight: '15px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#202023',
                  borderRadius: '4px',
                  margin: '2rem',
                  textAlign: 'center',
                }}
              >
               <Box
                  sx={{
                    width: '100%',
                  }}
                  data-aos="fade-left"
                >
                  <Canvas style={{ width: '100%', height: '300px' }}>
                    <Suspense fallback={null}>
                      <Model />
                    </Suspense>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[0, 10, 0]} />
                    <directionalLight
                      color="white"
                      intensity={1}
                      position={[0, 0, 5]}
                    />
                    <OrbitControls />
                  </Canvas>
                </Box>
                <Box
                  sx={{
                    maxWidth: '100%',
                    marginBottom: '2rem',
                  }}
                  data-aos="fade-right"
                >
                  <h1
                    style={{
                      fontFamily: "SF Pro Display Medium",
                      color: "#ededed",
                      fontWeight: 250,
                      fontSize: "1.65rem",
                      margin: '0',
                      lineHeight: '1.2',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 32,
                        background: "linear-gradient(to right, #00BFFF, #bdc2c4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      FISHINV
                    </span>{" "}
                    Simplified Inventory Management.
                  </h1>
                  <p
                    style={{
                      fontFamily: "SF-Pro-Display-Thin",
                      color: "#ededed",
                      marginTop: 20,
                      textAlign: "justify",
                      fontSize: "0.9rem",
                    }}
                  >
                    FISHINV is a powerful inventory management system that seamlessly integrates with the OFSOS project. Optimize your fish market's warehouse operations, control stock efficiently, and gain real-time analytics. Elevate your business with FISHINV today.
                  </p>
                  <Button
                    style={{ fontFamily: "SF Pro Display Medium", marginTop: 10 }}
                    variant="contained"
                    color="primary"
                    component={StyledLink}
                    to="/register"
                    sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            </Box>
            <Footer className="homefooter" />
          </Box>
        </Parallax>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
      <Parallax
          blur={{ min: -15, max: 25 }}
          bgImageAlt="the cat"
          strength={200}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '100%', }}>
        <StyledNav opacity={navOpacity} blur={navBlur}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img alt = "ss" src={logoImg} style={{width:"200px", height:"60px", marginLeft:"60px"}}/>
            </Box>
            <Box>
              <ShowOnLogOut>
                <NavItem sx={{fontFamily:'SF Pro Display Medium', marginTop: -2,}} component={StyledLink} to="/register">
                  Register
                </NavItem>
              </ShowOnLogOut>
              <ShowOnLogOut>
              <NavItem sx={{fontFamily:'SF Pro Display Medium', marginTop: -2, fontWeight: 200}} component={StyledLink} to="/login">
                  Login
                </NavItem>
              </ShowOnLogOut>
              <ShowOnLogin>
              <NavItem sx={{fontFamily:'SF Pro Display Medium', marginTop: -2, fontWeight: 200}} component={StyledLink} to="/dash">
                  Dashboard
                </NavItem>
              </ShowOnLogin>
            </Box>
          </StyledNav>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#202023', paddingTop: '60px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#202023', borderRadius: '4px', margin: '2rem' }}>
              <Box sx={{ maxWidth: '50%' }} data-aos="fade-right">
                <h1 style={{fontFamily: "SF Pro Display Medium", color:"#ededed", marginTop:-76, marginBottom:-10, marginLeft:30, fontWeight:250, fontSize: "1.65rem"}}>  <span style={{ fontWeight: 500,fontSize:32, background: "linear-gradient(to right, #00BFFF, #bdc2c4)",  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FISHINV</span> Simplified Inventory Management.</h1>
                <p style={{fontFamily: "SF-Pro-Display-Thin", color:"#ededed", marginTop:20, marginLeft:30, textAlign: "justify", fontSize: "0.9rem", }}>
                FISHINV is a powerful inventory management system that seamlessly integrates with the OFSOS project. Optimize your fish market's warehouse operations, control stock efficiently, and gain real-time analytics. Elevate your business with FISHINV today.</p>
                <Button style={{fontFamily: "SF Pro Display Medium",marginLeft:30, marginTop:10}} variant="contained" color="primary" component={StyledLink} to="/register" sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}>
                  Get Started
                </Button>
              </Box>
              <Box sx={{ flexBasis: '50%', maxWidth: '50%' }} data-aos="fade-left">
              <Canvas style={{ width: '100%', height: '600px', marginLeft:60, marginTop:-40 }}>
                <Suspense fallback={null}>
                  <Model />
                </Suspense>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 10, 0]} />
                <directionalLight 
                  color="white" 
                  intensity={1} 
                  position={[0, 0, 5]} 
                />
                <OrbitControls />
              </Canvas>
              </Box>
  
            </Box>
          </Box>
          <Footer className="homefooter" ></Footer>
        </Box>
        </Parallax>
      </ThemeProvider>
    );
  }

  
};

export default Home;
