class FallbackController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]
  include ActionController::MimeResponds
  
  def index
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end
end
