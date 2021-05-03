class User < ApplicationRecord
  authenticates_with_sorcery!
  enum role: [:guest, :author, :admin]

  validates :name,
            presence: true,
            uniqueness: true,
            length: { minimum: 2, maximum: 20},
            format: /\A[a-z_][\sa-z0-9_.-]+\z/i

  validates :email,
            presence: true,
            uniqueness: true,
            format: /\A[^@]+@[^@]+\.[^@]+\z/i

  scope :by_name, -> { order :name }
end
