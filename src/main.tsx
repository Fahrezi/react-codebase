import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryProvider } from './providers/QueryProvider.tsx'
import AppRoute from './config/route.tsx'
import { createTokens, createTokensWithJSON, legionTheme } from '@legion-ui/core'
import themeDigiternJson from "./gtp.json"
import { ThemeProvider } from '@emotion/react'

const TokensDigiternJSON = createTokensWithJSON(themeDigiternJson);
const TokensDigiTern = createTokens({
  apiUrl: "https://raw.githubusercontent.com/telkom-design/theme/main/int.json",
  tokensName: "digiternTokens",
  tokensDefault: TokensDigiternJSON,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider theme={legionTheme}>
        <AppRoute />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
