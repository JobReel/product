# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([
  { first_name: 'user1', last_name: 'user1ln', email: 'user1@email.com', title: 'title1', city: 'city1', state: 'state1', password: 'password', password_confirmation: 'password' },
  { first_name: 'user2', last_name: 'user2ln', email: 'user2@email.com', title: 'title2', city: 'city2', state: 'state2', password: 'password', password_confirmation: 'password' },
  { first_name: 'user3', last_name: 'user3ln', email: 'user3@email.com', title: 'title3', city: 'city3', state: 'state3', password: 'password', password_confirmation: 'password' },
  { first_name: 'user4', last_name: 'user4ln', email: 'user4@email.com', title: 'title4', city: 'city4', state: 'state4', password: 'password', password_confirmation: 'password' },
  { first_name: 'employer1', last_name: 'employerln', email: 'employer1@email.com', title: 'title5', city: 'city5', state: 'state5', password: 'password', password_confirmation: 'password', employer_role: true },
  { first_name: 'employer2', last_name: 'employerln', email: 'employer2@email.com', title: 'title5', city: 'city5', state: 'state5', password: 'password', password_confirmation: 'password', employer_role: true },
  { first_name: 'employer3', last_name: 'employerln', email: 'employer3@email.com', title: 'title5', city: 'city5', state: 'state5', password: 'password', password_confirmation: 'password', employer_role: true },
  { first_name: 'employer4', last_name: 'employerln', email: 'employer4@email.com', title: 'title5', city: 'city5', state: 'state5', password: 'password', password_confirmation: 'password', employer_role: true }
])

jobs = Job.create!([
  { user_id: '5', job_title: 'job title1', city: 'jobcity1', state: 'jobstate1', requirements: ['ambition', 'technical', 'creative', 'cultural'], question_id: [1, 3, 5, 7], team_ids: [5, 6, 7] },
  { user_id: '5', job_title: 'job title2', city: 'jobcity2', state: 'jobstate2', requirements: ['ambition', 'technical', 'creative', 'cultural'], question_id: [1, 3, 5, 7], team_ids: [5] }
])

competencies = Competency.create([
  { name: 'Ambition', summary: 'The persistent and generalized striving for success, attainment, and accomplishment. Ambitious people have an enduring interest in seeing that their efforts tie to outcomes of success like promotions or pay raises.'},
  { name: 'Technical Skills', summary: 'Practical knowledge and abilities needed to perform specific tasks. Often relate to mechanical, IT, financial or scientific tasks.'},
  { name: 'Creative Problem Solving', summary:'The mental processes associated with searching for an original and previously unknown solution to a problem. Typically involves using existing materials and methods in novel ways or a unique approach to the solution.'},
  { name: 'Cultural Sensitivity', summary: 'An awareness of and respect for other cultures and practices. Skills can include assessing cultural values and customs and how to communicate and include a variety of cultural groups.'},
  { name: 'Leadership', summary: 'The art of motivating an individual or group of people to act towards achieving a common goal. Different kinds of leaders will be more effective in some situations than in others.'},
  { name: 'Emotional Intelligence', summary: "The capability of individuals to recognize their own and other people's emotions, use emotional information to guide thinking and behavior and manage or adjust emotions to achieve one's goals."},
  { name: 'Hobbies & Interests', summary: 'Hobbies and Interests demonstrate an individuals broader set of skills and knowledge which may not be directly related to job tasks, but provide insight into personality.'},
  { name: 'Custom Question', summary: 'Employers have the opportunity to add a custom question of their choosing. Questions that are more open-ended will receive a wider variety of responses and insights.'}
])

videos = Video.create([
  { user_id: '1', cloud_video: 'video/upload/axpBRcRonL.mp4', private_id: 'axpBRcRonL' },
  { user_id: '1', cloud_video: 'video/upload/ggAlawpyjv.mp4', private_id: 'ggAlawpyjv' },
  { user_id: '1', cloud_video: 'video/upload/WtsrYTYWAQ.mp4', private_id: 'WtsrYTYWAQ' },
  { user_id: '1', cloud_video: 'video/upload/eqIXIFvfyO.mp4', private_id: 'eqIXIFvfyO' },
  { user_id: '1', cloud_video: 'video/upload/KiSYJbPHdF.mp4', private_id: 'KiSYJbPHdF' },
  { user_id: '1', cloud_video: 'video/upload/arDAeYCwcT.mp4', private_id: 'arDAeYCwcT' },
  { user_id: '1', cloud_video: 'video/upload/yELBjhQMDh.mp4', private_id: 'yELBjhQMDh' }
])

work_histories = WorkHistory.create([
  { user_id: '1', job_title: 'history1', company_name: 'company1', job_description: 'this is dumb', job_end_date: '2010-10-10', job_start_date: '2000-10-10' }
])

#Competency IDs:
# 1: Ambition
# 2: Technical Skills
# 3: Creative Problem Solving
# 4: Cultural Sensitivity
# 5: Leadership
# 6: Emotional Intelligence
# 7: Hobbies & Interests
# 8: Custom Question

questions = Question.create([
  # 1: Ambition
  {text: 'Describe the situation in which you demonstrated your highest level of ambition.', competency_id: 1},
  {text: 'What does a successful life look like to you?', competency_id: 1},
  # 2: Technical Skills
  {text: 'Describe in detail how you would go about web-optimization for raw HD video.', competency_id: 2},
  {text: 'Outline the steps for transforming a 2D illustration into a 3d printed piece.', competency_id: 2},
  # 3: Creative Problem Solving
  {text: 'How would you try to determine the number of barbers needed for a city of 50,000 people', competency_id: 3},
  {text: 'Imagine you are lost, alone in a foreign country and do not speak the language, how do you get home?', competency_id: 3},
  # 4: Cultural Sensitivity
  {text:'What advice would you give to a friend relocating to a foreign country?', competency_id: 4},
  {text: 'Your next project for work has you collaborating on a global team. How do you ensure clear communication?', competency_id: 4},
  # 5: Leadership
  {text: 'Describe a time when a colleague was working below expectations. What was your response and what was the ultimate outcome?', competency_id: 5},
  {text: 'What is the toughest group you had to get cooperation from? Describe how you handled it and the final outcome.', competency_id: 5},
  # 6: Emotional Intelligence
  {text: 'Describe a time you had a positive impact on somone.', competency_id: 6},
  {text: 'How could you create more balance in your life?', competency_id: 6},
  # 7: Hobbies & Interests
  {text: 'What do you find most rewarding about your favorite leisure activity?', competency_id: 7},
  {text: 'If you could take a year off (with pay) what would you do?', competency_id: 7},
  # 8: Custom Question
  {text: 'If you were an animal, what would you be and why?', competency_id: 8},
  {text: 'Describe how the role of Operations Manager demonstrates our corporate values.', competency_id: 8}
])


