# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130612031430) do

  create_table "events", :force => true do |t|
    t.string   "name"
    t.string   "event_url"
    t.float    "seatgeek_score"
    t.float    "average_price"
    t.string   "event_datetime"
    t.text     "performers"
    t.string   "performers_url"
    t.string   "venue_name"
    t.string   "venue_address"
    t.integer  "seatgeekevent_id"
    t.float    "lowest_price"
    t.string   "venue_cityzip"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.float    "latitude"
    t.float    "longitude"
    t.string   "image_url"
  end

  create_table "restaurant_tiles", :force => true do |t|
    t.integer  "user_id"
    t.integer  "restaurant_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "restaurants", :force => true do |t|
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.float    "latitude"
    t.float    "longitude"
    t.string   "city"
    t.string   "state"
    t.integer  "yelp_id"
    t.string   "yelp_stars_url"
    t.string   "name"
    t.string   "address"
    t.string   "zipcode"
    t.string   "image_url"
    t.float    "yelp_rating"
    t.string   "category"
    t.string   "yelp_url"
  end

  create_table "stacks", :force => true do |t|
    t.datetime "stackday"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  create_table "stacktiles", :force => true do |t|
    t.integer  "tile_id"
    t.integer  "stack_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "tiles", :force => true do |t|
    t.string   "name"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "tileable_id"
    t.string   "tileable_type"
    t.datetime "end"
    t.datetime "start"
    t.boolean  "allDay"
    t.string   "title"
  end

  create_table "timeshells", :force => true do |t|
    t.datetime "start"
    t.datetime "end"
    t.boolean  "allDay"
    t.string   "title"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "restaurant_id"
    t.integer  "stack_id"
  end

  create_table "user_tiles", :force => true do |t|
    t.integer  "user_id"
    t.integer  "tile_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "access_token"
    t.string   "image_url"
    t.string   "image_url_small"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "avatar"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
