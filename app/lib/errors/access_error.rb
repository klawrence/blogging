module Errors
  class AccessError < StandardError
    attr_accessor :status, :code, :message

    def initialize status=403, code=:forbidden, message=nil
      @status = status
      @code = code
      @message = message || I18n.t("security.#{code}")
    end

    def to_json
      {
          message: message,
          code: code
      }
    end
  end
end