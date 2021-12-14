require "test_helper"

class UserTest < ActiveSupport::TestCase

  test "user_count" do
    assert_equal 2, User.count
  end

  test "user_invalid" do
    test_user = User.create(username: 'kenny', firebase_id: 'unique_id', password_salt: 'somesalt')
    assert_not test_user.valid?, "Expected user to be invalid (username exists)"
    
    test_user = User.create(username: 'fitzy', firebase_id: 'kenny_firebase', password_salt: 'somesalt')
    assert_not test_user.valid?, "Expected user to be invalid (firebase_id exists)"
    
    test_user = User.create(username: 'fitzy', firebase_id: 'fitzy_firebase')
    assert_not test_user.valid?, "Expected user to be invalid (password_salt missing)"
    
    test_user = User.create(username: 'fitzy', password_salt: 'somesalt')
    assert_not test_user.valid?, "Expected user to be invalid (firebase_id missing)"
    
    test_user = User.create(firebase_id: 'kenny_firebase', password_salt: 'somesalt')
    assert_not test_user.valid?, "Expected user to be invalid (username missing)"
  end

  test "user_valid" do
    test_user = User.create(username: 'fitzy', firebase_id: 'fitzy_firebase', password_salt: 'somesalt')
    assert test_user.valid?, "Expected user to be valid"

    assert_equal 3, User.count
  end

end
