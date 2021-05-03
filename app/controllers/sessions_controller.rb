class SessionsController < ApplicationController
  skip_before_action :require_login

  def new
  end

  def create
    credentials = credential_params

    login(credentials[:email], credentials[:password]) do |user, failure|
      if failure
        @email = credentials[:email]
        @error = failure
        render action: 'new'
      else
        redirect_back_or_to(:root)
      end
    end
  end

  private
  def credential_params
    params.
        require(:credentials).
        permit(:email, :password)
  end
end
