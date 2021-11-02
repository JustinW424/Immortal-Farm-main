import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSharePriceAContract, useSharePriceBContract, useSharePriceCContract } from "../../hooks/useContract";
import useSpreadTVL from "../../hooks/useSpreadTVL";
import { truncate } from "../../utils";
import { StyledSocialWrapper } from "../Social";

export default function TotalTVL () {
    const tvlA = useSpreadTVL(useSharePriceAContract())
    const tvlB = useSpreadTVL(useSharePriceBContract())
    const tvlC = useSpreadTVL(useSharePriceCContract())
    const totalTVL = truncate(tvlA + tvlB + tvlC)
    return (

        <Box>
            <StyledSocialWrapper sx={{ justifyContent: 'center' }}>
                <Box>
                    <Typography color='primary' fontWeight='bold' sx={{ textTransform: 'uppercase', }} >Total TVL</Typography>

                    <Box display="flex" alignItems='center'>
                        <Typography color='primary' fontWeight='normal' fontSize="small" sx={{ whiteSpace: 'nowrap' }} >Total  TVL: </Typography>

                        <Typography fontWeight="400" color="primary">&nbsp; {totalTVL} &nbsp; </Typography>

                        <Typography fontWeight='bold' fontSize="small" color="secondary.main" >FTM</Typography>
                    </Box>
                </Box>
            </StyledSocialWrapper>
        </Box>
    )
}