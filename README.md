# Playroom

## Getting Started

To run this project in development first install RVM (ruby version manager (it is like virtualenv for python))

```
curl -sSL https://get.rvm.io | bash -s stable --ruby
rvm install ruby-2.4.0
gem install bundle
rvm use 2.4.0@playroom --create
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

## Running the tests

```
rspec
```

## Authors

* **Sebastián Schuchhardt**
