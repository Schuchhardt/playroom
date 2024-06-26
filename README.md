# Playroom

## Getting Started

To run this project in development first install RVM (ruby version manager (it is like virtualenv for python))

```
# install ruby
curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm install ruby-3.2.2
gem install bundle
rvm use 3.2.2@playroom --create
# install node
nvm install 16.18.1
nvm use 16.18.1
```

### Installing

```
bundle install
rake db:create
rake db:migrate
```

## Running (Back & Front)
```
foreman start
```

## Generate assets
```
rails assets:clean
rails assets:precompile
```

## Running the tests

```
rspec
```

## Authors

* **Sebastián Schuchhardt**
