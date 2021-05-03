ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"
Dir['test/test_helpers/*.rb'].each {|file| require file.sub(/^test\//, '') }

class ActiveSupport::TestCase
  parallelize(workers: :number_of_processors)
  fixtures :all
end

class ActionDispatch::IntegrationTest
  include TestHelpers::JsonTestHelper
  include TestHelpers::AuthenticationTestHelper
end
