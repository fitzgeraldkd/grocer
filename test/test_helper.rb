ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def assert_response_format(response, status=200)
    assert_equal response.media_type, 'application/json', 'Expected application/json content type'
    assert_equal response.status, status, 'Expected different status code'
    json_response = JSON.parse(response.body)
    assert json_response.key?('payload'), 'Expected response to have key of payload'
    assert json_response.key?('messages'), 'Expected response to have key of messages' 
    assert_equal json_response.length, 2, 'Expected response to only have two keys'
    assert json_response['messages'].kind_of?(Array), 'Expected response messages to be an array'
    return json_response['payload']
  end
end
