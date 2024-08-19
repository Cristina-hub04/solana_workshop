use anchor_lang::prelude::*;

declare_id!("YOUR PROGRAM's PUBLIC KEY (KEEP THIS AS-IS)");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod favorites {
    use super::*;
    
    pub fn set_favorites(context: Context<SetFavorites>, number: u64, color: String, hobbies: Vec<String>) -> Result<()> {
        let user_public_key = context.accounts.user.key();
        msg!("Greetings from {}", context.program_id);
        msg!(
            "User {user_public_key}'s favorite number is {number}, favorite color is: {color}"
        );
        msg!(
            "User's hobbies are: {:?}",
            hobbies
        ); 
        context.accounts.favorites.set_inner(Favorites {
            number,
            color,
            hobbies
        });
        Ok(())
    }
}
