/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check
'use strict';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');
module.exports = {

    mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
    target: 'webworker', // extensions run in a webworker context

    entry: './src/index.ts', // Entry point of your first module
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'index.iife.js', // Output filename
        library: 'SolidityParser', // Name of the global variable/library
        libraryTarget: 'umd', // Universal Module Definition format
        globalObject: 'this', // Global object (window in browser)
    },
    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     use: 'esbuild-loader', // Use ts-loader to handle TypeScript files
            //     exclude: [/node_modules/, /src\/antlr\/Solidity\.interp/, /src\/antlr\/Solidity\.tokens/, /src\/antlr\/SolidityLexer\.interp/, /src\/antlr\/SolidityLexer\.tokens/]

            // },
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'esbuild-loader'
                }]
            },

            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'esbuild-loader'
                }]
            },

            {
                test: /\.tokens$/,
                use: 'file-loader',
              },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,   // Exclude the 'fs' module
            path: false, // Exclude the 'path' module
        },
    },
    devtool: 'source-map', // Generate source maps for easier debugging
    // target: 'web', // Target environment (browser)
};
