/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
  };

  ENV.pipeline = {
    activateOnDeploy: true
  };

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    ENV['s3'] = {
      accessKeyId: process.env['AWS_KEY'],
      secretAccessKey: process.env['AWS_SECRET'],
      bucket: 'croissant.mtmckenna.com-assets',
      region: 'us-east-1'
    }

    ENV['s3-index'] = {
      accessKeyId: process.env['AWS_KEY'],
      secretAccessKey: process.env['AWS_SECRET'],
      bucket: 'croissant.mtmckenna.com',
      region: 'us-east-1'
    }
  }

  return ENV;
};
