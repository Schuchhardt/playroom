Rails.application.routes.draw do
  get 'landing/index'
  get 'landing/playsets'
  get 'landing/games'
  get 'landing/skills'
  get 'landing/resources'
  get 'landing/skills_categories'
  get 'landing/playsets/:id' => "landing#playset"
  get 'landing/games/:id' => "landing#game"
  
  root to: 'landing#index'
  devise_for :users, controllers: { registrations: 'users/registrations' }
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
