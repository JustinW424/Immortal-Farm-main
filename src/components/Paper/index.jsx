
import { styled } from "@mui/system"
import { Paper } from "@mui/material"
const ShadowPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    borderRadius: '0',
    borderTopRightRadius: theme.shape.borderRadius * 3,
    borderBottomLeftRadius: theme.shape.borderRadius * 3,
    padding: theme.spacing(2),
    position: 'relative',
    "&:after": {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopRightRadius: theme.shape.borderRadius * 3,
        borderBottomLeftRadius: theme.shape.borderRadius * 3,
        backgroundColor: theme.palette.common.white,
        transform: 'translate(15px,15px)',
        content: "''",
        zIndex: -1,
        boxShadow: `0px 0px 10px ${theme.palette.common.white}`
    }
}))


export default ShadowPaper;