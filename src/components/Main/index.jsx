import { Grid, Link, Typography } from "@mui/material";
import { Box, } from "@mui/system";
import { useState } from "react";
import EyeBackground from "../EyeComponent";
import ShadowPaper from "../Paper";
import About from "../About";
import Spread from "../Spread"
import Social from "../Social"
import TotalTVL from "../TotalTVL";
export default function Main () {
    const [currentTab, setCurrentTab] = useState(0);
    return (
        <main>
            <Box sx={{ px: { md: 10, xs: 3 }, pb: 4 }}>
                <Grid container spacing={8}>
                    <Grid item xl={4} lg={4} xs={12}>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-end" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(0) }} active={currentTab === 0}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>About</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-end" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(1) }} active={currentTab === 1} eyeprops={{ sx: { transform: 'rotate(18deg)' } }} >
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Spread A</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-end" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(2) }} active={currentTab === 2} eyeprops={{ sx: { transform: 'rotate(18deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Spread B</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-end" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(3) }} active={currentTab === 3} eyeprops={{ sx: { transform: 'rotate(18deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Spread C</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Box flexGrow={0} display={'flex'} justifyContent={{ xs: 'center', lg: "flex-end" }}>
                            <Box>
                                <EyeBackground onClick={() => { setCurrentTab(4) }} active={currentTab === 4} eyeprops={{ sx: { transform: 'rotate(11deg)' } }}>
                                    <Typography color="common.white" variant="h4" fontWeight="800" sx={{ textShadow: '0px 0px 5px #fff', fontStyle: 'italic', textTransform: 'uppercase' }}>Documentation</Typography>
                                </EyeBackground>
                            </Box>
                        </Box>
                        <Social />
                    </Grid>
                    <Grid item xl={1} lg={0} sx={{ display: { xs: 'none', xl: 'block' } }}>
                    </Grid>
                    <Grid item xl={7} lg={8} xs={12}>
                        <Grid container spacing={8} sx={{ height: '100%' }} justifyContent='center'>

                            <Grid item xl={6} lg={6} md={6} xs={12}>
                                <ShadowPaper sx={{ height: '100%' }}>
                                    <TabPanel value={currentTab} index={0} >
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae necessitatibus ducimus quisquam magnam, ullam ex, quos illo eum sit dicta iure sequi voluptatibus nam pariatur, expedita aliquam omnis! Quas, recusandae!
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={1} >
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae necessitatibus ducimus quisquam magnam, ullam ex, quos illo eum sit dicta iure sequi voluptatibus nam pariatur, expedita aliquam omnis! Quas, recusandae!
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={2} >
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae necessitatibus ducimus quisquam magnam, ullam ex, quos illo eum sit dicta iure sequi voluptatibus nam pariatur, expedita aliquam omnis! Quas, recusandae!
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={3} >
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae necessitatibus ducimus quisquam magnam, ullam ex, quos illo eum sit dicta iure sequi voluptatibus nam pariatur, expedita aliquam omnis! Quas, recusandae!
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={4} >
                                        What does it do? <br />
                                        No-Stress Investment <br />
                                        Want to invest in the FTM ecosystem but don't know where to start? <br />
                                        Want to invest in a dex but don't know which farm to choose? <br />
                                        Allow our immortals to do the magic for you. <br />
                                    </TabPanel>
                                </ShadowPaper>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                                <ShadowPaper sx={{ height: '100%' }}>
                                    <TabPanel value={currentTab} index={0} >
                                        <About />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={1} >
                                        <Spread type={'A'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={2} >
                                        <Spread type={'B'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={3} >
                                        <Spread type={'C'} />
                                    </TabPanel>
                                    <TabPanel value={currentTab} index={4} >
                                        <Link color="secondary.main" href="https://app.gitbook.com/o/NIVyh8TfB4kaXoc6oWjU/s/G90F27FwK1tfpk9JQc2Q/" target="_blank">Visit Gitbook</Link>
                                    </TabPanel>
                                </ShadowPaper>
                            </Grid>
                            <Grid item md={5} xs={12}>
                                <TotalTVL />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </main >
    )
}


function TabPanel (props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )}
        </div>
    );
}