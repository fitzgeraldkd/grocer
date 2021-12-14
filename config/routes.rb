Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users, except: [:index, :show]
    resources :ingredients
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end
end
