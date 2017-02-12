module.exports = function (grunt) {
  grunt.initConfig({
    jsdoc: {
      dist: {
        src: [
          "README.md",
          "index.js",
        ],
        options: {
          destination: "docs",
          template: "node_modules/ink-docstrap/template",
          // configure: "node_modules/ink-docstrap/template/jsdoc.conf.json"
          configure: "jsdoc.json"
        }
      }
    },

    tslint: {
      options: {
        configuration: "tslint.json",
        force: false,
        fix: true
      },
      files: {
        src: [
          "index.ts",
          "examples/**/*.ts",
        ]
      }
    },

    ts: {
      default: {
        // specifying tsconfig as a boolean will use the "tsconfig.json" in same folder as Gruntfile.js
        tsconfig: true
      }
    },

    watch: {
      ts: {
        files: [
          "index.ts",
          "examples/**/*.ts",
          "gruntfile.js",
          "tsconfig.json",
          "tslint.json"
        ], // 監視するファイル
        tasks: ["tslint", "ts"] // 実行するタスク
      }
    }
  });

  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-watch");
};
