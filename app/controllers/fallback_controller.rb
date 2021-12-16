class FallbackController < ApplicationController
  skip_before_action :authenticate_user, only: [:index]
  
  def index
    render file: 'public/index.html'
  end
end
