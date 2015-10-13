module.exports = function (grunt) {
    grunt.config('csslint', {
        options: {
						'adjoining-classes'							: false,
						'box-model'											: true,
						'box-sizing'										: false,
						'bulletproof-font-face'					: false,
						'compatible-vendor-prefixes'		: false,
						'display-property-grouping'			: true,
						'duplicate-background-images'		: true,
						'duplicate-properties'					: true,
						'empty-rules'										: true,
						'errors'												: false,
						'fallback-colors'								: false,
						'floats'												: false,
						'font-faces'										: false,
						'font-sizes'										: false,
						'gradients'											: false,
						'ids'														: true,
						'import'												: true,
						'important'											: true,
						'known-properties'							: true,
						'outline-none'									: true,
						'overqualified-elements'				: true,
						'qualified-headings'						: true,
						'regex-selectors'								: false,
						'rules-count'										: false,
						'selector-max-approaching'			: false,
						'selector-max'									: false,
						'shorthand'											: true,
						'star-property-hack'						: true,
						'text-indent'										: true,
						'underscore-property-hack'			: true,
						'unique-headings'								: true,
						'universal-selector'						: false,
						'unqualified-attributes'				: true,
						'vendor-prefix'									: true,
						'zero-units'										: true
        },
        src: ['./site/css/*.css']
    });
    grunt.loadNpmTasks('grunt-contrib-csslint');
};
