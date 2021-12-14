require "test_helper"

class UserTest < ActiveSupport::TestCase

  test "user_count" do
    assert_equal 2, User.count
  end

  test "user_invalid" do
    test_user = User.create(username: 'kenny', firebase_id: 'unique_id', email: 'fake_email_3@fake.com')
    assert_not test_user.valid?, "Expected user to be invalid (username exists)"
    
    test_user = User.create(username: 'fitzy', firebase_id: 'kenny_firebase', email: 'fake_email_3@fake.com')
    assert_not test_user.valid?, "Expected user to be invalid (firebase_id exists)"
    
    test_user = User.create(username: 'fitzy', firebase_id: 'unique_id', email: 'fake_email@fake.com')
    assert_not test_user.valid?, "Expected user to be invalid (email exists)"
    
    test_user = User.create(username: 'fitzy', firebase_id: 'fitzy_firebase')
    assert_not test_user.valid?, "Expected user to be invalid (email missing)"
    
    test_user = User.create(username: 'fitzy', email: 'fake_email_3@fake.com')
    assert_not test_user.valid?, "Expected user to be invalid (firebase_id missing)"
    
    test_user = User.create(firebase_id: 'kenny_firebase', email: 'fake_email_3@fake.com')
    assert_not test_user.valid?, "Expected user to be invalid (username missing)"
  end

  test "user_valid" do
    test_user = User.create(username: 'fitzy', firebase_id: 'fitzy_firebase', email: 'fake_email_3@fake.com')
    assert test_user.valid?, "Expected user to be valid"

    assert_equal 3, User.count
  end

end
