package eu.consilium.core.model.dto.transaction;

import eu.consilium.core.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDTO {
    private Long id;
    private UserDTO fromUser;
    private UserDTO toUser;
    private Double amount;
    private String status;
    private LocalDateTime timestamp;
}