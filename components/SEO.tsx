export default function SEO() {
    const description = 'A simple, easier way to get notified on your vaccination appointment.';
    const title = 'Nak Naksin!';
    const keyword = [
        'Malaysia',
        'Vaccine',
        'Vaccination',
        'Vaksinasi',
        'Vaksin',
        'NakVaksin',
        'Nak Vaksin',
        'My Sejahtera',
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
        </>
    );
}
