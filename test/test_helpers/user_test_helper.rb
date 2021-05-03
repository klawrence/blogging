module TestHelpers
  module UserTestHelper
    def create_user name, options={}
      attributes = {
          name: name,
          email: "#{name.downcase}@example.com",
          role: :author,
          password: 'letmein'
      }
      User.create! attributes.merge(options)
    end

    def create_admin
      create_user 'admin', role: :admin
    end
  end
end
