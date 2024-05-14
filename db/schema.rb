# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_05_14_022917) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_stat_statements"
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "communes", force: :cascade do |t|
    t.string "name"
    t.bigint "region_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["region_id"], name: "index_communes_on_region_id"
  end

  create_table "establishment_resources", force: :cascade do |t|
    t.bigint "establishment_id"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["establishment_id"], name: "index_establishment_resources_on_establishment_id"
    t.index ["resource_id"], name: "index_establishment_resources_on_resource_id"
  end

  create_table "establishments", force: :cascade do |t|
    t.string "name"
    t.string "rbd"
    t.string "address"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "establishment_kind"
    t.bigint "commune_id"
    t.integer "ive"
    t.integer "total_students"
    t.integer "students_per_course"
    t.boolean "education_level_preschool"
    t.boolean "education_level_primary"
    t.boolean "education_level_secondary"
    t.boolean "education_level_secondary_tech"
    t.string "contact_name"
    t.string "contact_email"
    t.string "contact_phone"
    t.index ["commune_id"], name: "index_establishments_on_commune_id"
    t.index ["rbd", "rbd"], name: "unique_rbd", unique: true
  end

  create_table "experiences", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.bigint "game_id"
    t.bigint "user_id"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_experiences_on_game_id"
    t.index ["user_id"], name: "index_experiences_on_user_id"
  end

  create_table "game_idps", force: :cascade do |t|
    t.bigint "idp_id"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_idps_on_game_id"
    t.index ["idp_id"], name: "index_game_idps_on_idp_id"
  end

  create_table "game_levels", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "level_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_levels_on_game_id"
    t.index ["level_id"], name: "index_game_levels_on_level_id"
  end

  create_table "game_sets", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "playset_id"
    t.string "suggested_copies"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "studied_goal"
    t.index ["game_id"], name: "index_game_sets_on_game_id"
    t.index ["playset_id"], name: "index_game_sets_on_playset_id"
  end

  create_table "game_skills", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "skill_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_skills_on_game_id"
    t.index ["skill_id"], name: "index_game_skills_on_skill_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "suggested_age"
    t.string "game_time"
    t.string "number_of_players"
    t.string "difficulty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "youtube_link"
    t.boolean "level_preschool", default: false
    t.boolean "level_first_primary", default: false
    t.boolean "level_second_primary", default: false
    t.boolean "level_secondary", default: false
    t.string "sku"
    t.integer "game_time_from"
    t.integer "game_time_to"
    t.string "game_type"
    t.string "cover_url"
    t.string "pdf_url"
  end

  create_table "idps", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "levels", force: :cascade do |t|
    t.string "name"
    t.string "subcategory"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "since_age"
  end

  create_table "playsets", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "playset_type"
    t.bigint "establishment_id"
    t.date "start_at"
    t.date "finish_at"
    t.string "cover_url"
    t.index ["establishment_id"], name: "index_playsets_on_establishment_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "short_name"
  end

  create_table "resources", force: :cascade do |t|
    t.string "name"
    t.string "file_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "skill_category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teacher_sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "game_id", null: false
    t.integer "number_of_students"
    t.string "subject"
    t.datetime "played_at"
    t.integer "grade"
    t.boolean "ods_4_material"
    t.boolean "ods_4_motivation"
    t.boolean "ods_5_gender"
    t.boolean "ods_5_stereotypes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["game_id"], name: "index_teacher_sessions_on_game_id"
    t.index ["user_id"], name: "index_teacher_sessions_on_user_id"
  end

  create_table "user_establishments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "establishment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["establishment_id"], name: "index_user_establishments_on_establishment_id"
    t.index ["user_id"], name: "index_user_establishments_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "last_name"
    t.string "phone"
    t.integer "user_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "role"
    t.string "rut"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "communes", "regions"
  add_foreign_key "establishment_resources", "establishments"
  add_foreign_key "establishment_resources", "resources"
  add_foreign_key "establishments", "communes"
  add_foreign_key "experiences", "games"
  add_foreign_key "experiences", "users"
  add_foreign_key "game_idps", "games"
  add_foreign_key "game_idps", "idps"
  add_foreign_key "game_levels", "games"
  add_foreign_key "game_levels", "levels"
  add_foreign_key "game_sets", "games"
  add_foreign_key "game_sets", "playsets"
  add_foreign_key "game_skills", "games"
  add_foreign_key "game_skills", "skills"
  add_foreign_key "playsets", "establishments"
  add_foreign_key "teacher_sessions", "games"
  add_foreign_key "teacher_sessions", "users"
  add_foreign_key "user_establishments", "establishments"
  add_foreign_key "user_establishments", "users"
end
