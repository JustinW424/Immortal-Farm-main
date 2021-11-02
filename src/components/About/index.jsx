import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSpreadABalance, useSpreadBBalance, useSpreadCBalance } from "../../hooks/useSpreadBalacne";

export default function About () {
    const spreadABalance = useSpreadABalance()
    const spreadBBalance = useSpreadBBalance()
    const spreadCBalance = useSpreadCBalance()
    return (
        <Box >
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Spread A Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadABalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Spread B Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadBBalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>
            <Box display="flex">
                <Typography fontWeight="600" color="common.white">Spread C Balance:&nbsp;</Typography>
                <Typography fontWeight="400" color="common.white">{spreadCBalance}</Typography>
                <Typography fontWeight="600" color="secondary.main">&nbsp;FTM</Typography>
            </Box>

        </Box>
    )
}