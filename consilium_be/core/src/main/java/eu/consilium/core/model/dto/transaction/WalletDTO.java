package eu.consilium.core.model.dto.transaction;

import eu.consilium.core.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalletDTO {
    private UserDTO user;
    private Double balance;
}