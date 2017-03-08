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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170308002219) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "educations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "college_name"
    t.string   "college_major"
    t.string   "college_end_date"
    t.string   "college_start_date"
    t.text     "education_description"
    t.string   "video_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "recommendations", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "verified"
    t.string   "company_name"
    t.string   "company_title"
    t.string   "user_relationship"
    t.string   "time_known"
    t.string   "video_id"
    t.string   "profile_image"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "title"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "city"
    t.string   "state"
    t.text     "bio"
    t.string   "degree"
    t.string   "degree_type"
    t.string   "degree_field"
    t.string   "image"
    t.string   "video"
    t.index ["city"], name: "index_users_on_city", using: :btree
    t.index ["degree_field"], name: "index_users_on_degree_field", using: :btree
    t.index ["degree_type"], name: "index_users_on_degree_type", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["first_name"], name: "index_users_on_first_name", using: :btree
    t.index ["last_name"], name: "index_users_on_last_name", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["state"], name: "index_users_on_state", using: :btree
    t.index ["title"], name: "index_users_on_title", using: :btree
  end

  create_table "videos", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "cloud_video"
    t.string   "video_section"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "private_id"
  end

  create_table "work_histories", force: :cascade do |t|
    t.integer "user_id"
    t.string  "job_title"
    t.string  "company_name"
    t.date    "job_end_date"
    t.text    "job_description"
    t.date    "job_start_date"
    t.index ["company_name"], name: "index_work_histories_on_company_name", using: :btree
    t.index ["job_title"], name: "index_work_histories_on_job_title", using: :btree
  end

end
