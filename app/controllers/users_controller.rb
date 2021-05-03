class UsersController < ApplicationController
  skip_before_action :require_login, only: :show
  before_action :require_admin, except: :show
  before_action :set_user, except: :index

  helper_method :current_user, :admin?

  def index
    @users = User.by_name
  end

  def show
  end

  protected
  def set_user
    @user = User.find params[:id]
  end

  def admin?
    current_user&.admin?
  end

  def require_admin
    require_login
    raise Errors::AccessError unless admin?
  end
end
