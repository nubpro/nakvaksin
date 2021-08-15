export default function SEO() {
    const description = 'A simple, easier way to get notified on your vaccination appointment.';
    const title = 'NakVaksin';
    const keyword = [
        'Malaysia',
        'Vaccine',
        'Vaccination',
        'Vaksinasi',
        'Vaksin',
        'Nak Vaksin',
        'NakVaksin',
        'My Sejahtera',
        'MySejahtera',
        'MySej'
    ];
    const url = 'https://www.nakvaksin.com/';
    const twitterUserName = '@NakVaksin';
    const imageUrl = 'https://www.nakvaksin.com/_next/image?url=%2Fphone.png&w=640&q=75';
    return (
        <>
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword.join(',')} />
            <link rel="canonical" href={url} />
            <meta name="robots" content="all" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={imageUrl} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={twitterUserName} />
            <meta name="twitter:creator" content={twitterUserName} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </>
    );
}
