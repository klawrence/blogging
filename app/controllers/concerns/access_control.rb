module AccessControl
  extend ActiveSupport::Concern

  included do
    before_action :require_login
    helper_method :current_user, :admin?
  end

  protected
  def admin?
    current_user&.admin?
  end

  def require_admin
    require_login
    raise Errors::AccessError unless admin?
  end
end


