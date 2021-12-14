# Load the Rails application.
require_relative "application"

secrets = File.join(Rails.root, 'config', 'secrets.rb')
load(secrets) if File.exist?(secrets)

# Initialize the Rails application.
Rails.application.initialize!
