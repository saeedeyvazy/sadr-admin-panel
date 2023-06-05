// const path = require('path')

// export default () => ({
//     plugins: [
//         {
//             options: someOptions,
//             plugin: somePlugin,
//             webpack: {
//                 alias: {
//                     '@': path.resolve(__dirname, 'src'),
//                 },

//             },
//         },
//     ],
// })


const CracoAlias = require('craco-alias')

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ],

}