import { ReactElement } from 'react'

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
    return (
        <html lang="en">
            <head>
                <title>Flex openapi docs</title>
                <meta name="robots" content="noindex" />
            </head>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}
