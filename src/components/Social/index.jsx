import { Box, styled } from "@mui/system";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faTwitter, } from "@fortawesome/free-brands-svg-icons"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { IconButton, Link } from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
export const StyledSocialWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '0',
    borderTopRightRadius: theme.shape.borderRadius * 3,
    borderBottomLeftRadius: theme.shape.borderRadius * 3,
    position: 'relative',
    maxWidth: '95%',
    margin: '0 auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    "&:after": {
        backgroundColor: theme.palette.common.white,
        borderTopRightRadius: theme.shape.borderRadius * 3,
        borderBottomLeftRadius: theme.shape.borderRadius * 3,
        position: 'absolute',
        left: -7,
        top: -5,
        right: -7,
        bottom: -5,
        content: "''",
        zIndex: -1,
        boxShadow: '0px 0px 10px #fff'
    }
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    }
}))
export default function Social () {

    return (<StyledSocialWrapper>
        <Link href="https://twitter.com/immortalfarm" target="_blank">
            <StyledIconButton>

                <FontAwesomeIcon icon={faTwitter} />
            </StyledIconButton>
        </Link>
        <Link href="https://discord.gg/k6cFGB9Vyc" target="_blank">
            <StyledIconButton variant="contained">
                <FontAwesomeIcon icon={faDiscord} />
            </StyledIconButton>
        </Link>
        <Link href="https://app.gitbook.com/o/NIVyh8TfB4kaXoc6oWjU/s/G90F27FwK1tfpk9JQc2Q/" target="_blank">
            <StyledIconButton>

                <FontAwesomeIcon icon={faBook} />
            </StyledIconButton>
        </Link>
        <Link href="https://t.me/joinchat/Vt2x8QtD1jpkMWEx" target="_blank">
            <StyledIconButton>
                <TelegramIcon />
            </StyledIconButton>
        </Link>
    </StyledSocialWrapper>)
}