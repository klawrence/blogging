class UsersController < ApplicationController
  skip_before_action :require_login, only: :show
  before_action :require_admin, except: :show
  before_action :set_user, except: :index

  layout 'react'

  def index
    @users = User.by_name
  end

  def show
  end

  protected
  def set_user
    @user = User.find params[:id]
  end
end
