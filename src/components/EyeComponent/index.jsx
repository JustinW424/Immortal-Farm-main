import { Box, styled } from "@mui/system"



const StyledEye = styled(Box)(({ theme, color }) => ({
    margin: ' 0 auto',
    width: '100%',
    height: '100%',
    backgroundColor: color ? color : theme.palette.background.paper,
    borderRadius: '100% 0px',
    transform: 'rotate(27deg)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
}))
const Wrapper = styled(Box)(({ theme, active }) => ({
    position: 'relative',
    padding: theme.spacing(4, 4),
    flexGrow: 0,
    cursor: 'pointer',
    opacity: active ? .7 : 1,
    "&:hover": {
        opacity: .85
    }
}))

export default function EyeBackground ({ children, eyeprops, active, ...props }) {
    return <Wrapper  {...props} active={active}>
        <StyledEye {...eyeprops} />
        {
            children
        }
    </Wrapper>
}