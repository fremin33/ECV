$(document).ready(function () {
    $('#myMenu a').myPlugin({
        output: 'output',
        dataDiv: 'data',
        removeExtension: true,
        loader: {
            source: 'https://bit.ly/2Jmnf3u',
            css: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "none",
            }
        },
    });
});