module TestHelpers
  module JsonTestHelper
    def json_response options={}
      assert_response options[:expected_response] || :success
      JSON.parse response.body, symbolize_names: true
    end
  end
end

