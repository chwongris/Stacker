require 'carrierwave/orm/activerecord'

CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',
    :aws_access_key_id      => 'AKIAJSJN5FF6N5Z7QFPA',
    :aws_secret_access_key  => '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',
    :region                 => 'us-east-1'
  }
  config.fog_directory  = 'StackerAvatar'
  # config.fog_host       = 'https://s3.amazonaws.com'
  config.fog_public     = true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}
end
