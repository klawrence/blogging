module TestHelpers
  module AuthenticationTestHelper
    def sign_in user, options={}
      password = options[:password] || 'letmein'
      post sessions_url,
           params: {
               credentials: {
                   email:    user.email,
                   password: password
               },
           }
    end
  end
end

